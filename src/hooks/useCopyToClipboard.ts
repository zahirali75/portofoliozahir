import { useCallback, useEffect, useRef, useState } from 'react'

type State = 'idle' | 'copied' | 'failed'

/**
 * Salin teks ke papan klip dengan fallback untuk browser/konteks
 * yang memblokir Clipboard API (mis. halaman non-HTTPS).
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [state, setState] = useState<State>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      window.clearTimeout(timer.current)
      let ok = false

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
          ok = true
        }
      } catch {
        ok = false
      }

      if (!ok) {
        // Fallback lama: textarea sementara + execCommand.
        try {
          const ta = document.createElement('textarea')
          ta.value = text
          ta.setAttribute('readonly', '')
          ta.style.position = 'fixed'
          ta.style.top = '-1000px'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          ta.setSelectionRange(0, text.length)
          ok = document.execCommand('copy')
          document.body.removeChild(ta)
        } catch {
          ok = false
        }
      }

      setState(ok ? 'copied' : 'failed')
      timer.current = window.setTimeout(() => setState('idle'), resetMs)
      return ok
    },
    [resetMs],
  )

  return { copy, state }
}

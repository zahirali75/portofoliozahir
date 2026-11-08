import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Skills } from '../components/sections/Skills'
import { CardStack } from '../components/sections/CardStack'
import { Experience } from '../components/sections/Experience'
import { Contact } from '../components/sections/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <CardStack />
      <Experience />
      <Contact />
    </>
  )
}

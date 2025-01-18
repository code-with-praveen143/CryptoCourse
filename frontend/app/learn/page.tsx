import Hero from './components/home/hero'
import CourseGrid from './components/home/course-grid'
import Footer from './components/layout/footer'
import { Container } from './components/ui/container'
import Header from './components/Header'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Container>
          <CourseGrid />
        </Container>
      </main>
      <Footer />
    </div>
  )
}


import Page from '../components/Page';
import ContactLinks from '../components/ContactLinks';
export default function About() {
  return <Page title="About"><main id="main" className="letter"><article className="letter-body" aria-label="About des.bin">
    <h1 className="sr-only">About des.bin</h1>
    <p>hello,</p>
    <p>thanks for stopping by. here’s a little more about des.bin.</p>
    <p>we’re an independent design studio. we bring curiosity, careful thinking and a hands-on approach to the things we make.</p>
    <p>before anything else, we spend time understanding the question. what you’re working on, who it’s for, what it needs to do and where you want to take it. that conversation helps us find the right starting point together.</p>
    <p>from there, we explore. we collect references, make connections and test directions. we’re interested in the moment when something starts to feel clear, coherent and a little unexpected. something with a reason behind it.</p>
    <p>we think about the whole system. the identity, the experience, the words and the small details that connect them. a good idea should carry through all of it, from the first impression to the things people use every day.</p>
    <p>des.bin is a place for that kind of work. a place to ask better questions, make things with care and keep learning along the way.</p>
    <p className="muted">This is draft studio copy. We’ll replace it with our own story soon.</p>
    <ContactLinks />
  </article></main></Page>;
}

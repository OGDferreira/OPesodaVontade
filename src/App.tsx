import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, Check, ChevronDown, CirclePlay, Compass, Eye, Flame, LockKeyhole,
  MoveUpRight, Quote, ShieldCheck, Sparkles, Target, Zap,
} from 'lucide-react'

const HOTMART_CHECKOUT_URL = import.meta.env.VITE_HOTMART_CHECKOUT_URL
const isCheckoutConfigured = Boolean(HOTMART_CHECKOUT_URL)

const testimonials = [
  { name: 'Marina A.', role: 'Leitora beta', text: 'Placeholder — substituir por avaliação real antes da publicação definitiva. A estrutura do livro me fez parar de esperar pela motivação.', initials: 'MA' },
  { name: 'Rafael M.', role: 'Leitor beta', text: 'Exemplo de depoimento. O Peso da Vontade transforma ideias abstratas em decisões que você consegue praticar no dia seguinte.', initials: 'RM' },
  { name: 'Camila S.', role: 'Leitora beta', text: 'Exemplo de depoimento. Uma leitura direta, densa e necessária para quem cansou de começar de novo toda segunda-feira.', initials: 'CS' },
]

const benefits = [
  { icon: Target, title: 'Disciplina sem depender de motivação', text: 'Crie sistemas internos para continuar quando o entusiasmo acabar e o caminho exigir consistência.' },
  { icon: Eye, title: 'Atenção sob seu comando', text: 'Pare de entregar sua energia a impulsos, distrações e urgências que não constroem o seu futuro.' },
  { icon: Compass, title: 'Estratégia para decisões difíceis', text: 'Aprenda a pensar antes de reagir, escolher seus movimentos e jogar o jogo de longo prazo.' },
  { icon: Flame, title: 'Ambição convertida em execução', text: 'Transforme aquilo que você diz querer em atos concretos, repetidos e impossíveis de ignorar.' },
]

const chapters = [
  ['01', 'O contrato invisível', 'As regras silenciosas que governam aquilo que você aceita.'],
  ['02', 'A direção antes da velocidade', 'Por que acelerar sem clareza apenas torna o desvio mais caro.'],
  ['03', 'O governo da atenção', 'A batalha central do mundo moderno acontece dentro da sua atenção.'],
  ['04', 'A arte de começar mal', 'A ação imperfeita é o antídoto para a paralisia elegante.'],
  ['05', 'O atrito necessário', 'Use resistência como treino, não como sinal para desistir.'],
  ['06', 'A vantagem da repetição', 'O que você repete em silêncio constrói o que todos enxergam.'],
  ['07', 'A leitura fria dos fatos', 'Clareza para separar realidade, medo e narrativa conveniente.'],
  ['08', 'O domínio da reação', 'Você não escolhe todos os eventos — escolhe o próximo movimento.'],
  ['09', 'Limites sem teatro', 'Dizer não sem culpa, agressividade ou necessidade de aprovação.'],
  ['10', 'Reputação é memória coletiva', 'Construa confiança pela coerência entre promessa e entrega.'],
  ['11', 'Influência com responsabilidade', 'Presença, comunicação e poder sem perder o centro.'],
  ['12', 'A linguagem do poder tranquilo', 'Firmeza que não precisa levantar a voz para ser respeitada.'],
  ['13', 'O valor estratégico do não', 'Cada recusa consciente protege uma escolha importante.'],
  ['14', 'Dinheiro como margem de escolha', 'Liberdade começa quando suas decisões não dependem do desespero.'],
  ['15', 'O mapa das relações', 'As pessoas ao redor moldam o padrão que você considera normal.'],
  ['16', 'Crise como laboratório', 'Use pressão para revelar e fortalecer quem você está se tornando.'],
  ['17', 'O método depois do fracasso', 'Falhar não precisa virar identidade — pode virar informação.'],
  ['18', 'A disciplina da paciência', 'Resultados robustos exigem uma relação madura com o tempo.'],
  ['19', 'Identidade construída em atos', 'Você se torna aquilo que prova para si mesmo todos os dias.'],
  ['20', 'A vida que resiste ao aplauso', 'Escolha uma direção que continue fazendo sentido quando ninguém estiver olhando.'],
  ['21', 'O desenho de uma vida durável', 'Ambição com estrutura para não se destruir no caminho.'],
  ['22', 'O comando de amanhã', 'O futuro começa com a decisão que você toma antes de fechar este livro.'],
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.12 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Cta({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <a className={`cta ${light ? 'cta-light' : ''}`} href={HOTMART_CHECKOUT_URL || '#comprar'} aria-disabled={!isCheckoutConfigured} onClick={(event) => { if (!isCheckoutConfigured) event.preventDefault() }}><span>{children}</span><ArrowRight size={18} /></a>
}

function SectionHeading({ eyebrow, title, text, align = 'left' }: { eyebrow: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return <div className={`section-heading ${align === 'center' ? 'center' : ''}`}><span className="eyebrow">{eyebrow}</span><h2 dangerouslySetInnerHTML={{ __html: title }} />{text && <p>{text}</p>}</div>
}

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const faqs = [
    ['E se eu não tiver disciplina?', 'É exatamente por isso que este livro existe. Disciplina não é um traço reservado a poucas pessoas; é uma capacidade construída por decisões menores e repetidas.'],
    ['E se eu já tiver tentado mudar antes?', 'Você não precisa de mais uma promessa grandiosa. Precisa enxergar onde seu método quebra e aprender a criar uma estrutura que sobreviva aos dias ruins.'],
    ['Preciso ler tudo de uma vez?', 'Não. O livro foi desenhado para ser absorvido com calma. Leia um capítulo, reflita e leve uma ideia para a prática antes de avançar.'],
    ['Serve para quem está começando?', 'Sim. A linguagem é direta e os princípios são aplicáveis tanto para quem está reconstruindo a rotina quanto para quem busca um próximo nível.'],
    ['Como recebo o e-book?', 'Após a confirmação da compra, o acesso digital é liberado pela Hotmart. Você poderá ler no dispositivo que preferir.'],
  ]
  return <div className="page">
    <div className="grain" />
    <header className="topbar"><a className="brand" href="#inicio">O PESO <span>DA</span> VONTADE</a><a className="top-link" href="#conteudo">Ver o conteúdo <MoveUpRight size={15} /></a></header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-glow" />
        <div className="hero-copy"><Reveal><span className="eyebrow">UM LIVRO SOBRE O COMANDO DE SI</span><h1>Você não precisa de mais vontade.<br /><em>Precisa assumir o comando.</em></h1><p className="hero-lead">Disciplina, estratégia e autodomínio para construir uma vida que obedece às suas decisões — não aos seus impulsos.</p><Cta>QUERO ACESSAR O LIVRO AGORA</Cta><div className="trust-row"><span><ShieldCheck size={15} /> Acesso imediato</span><span><LockKeyhole size={15} /> Compra segura Hotmart</span></div></Reveal></div>
        <Reveal className="hero-visual" delay={150}><div className="cover-wrap"><div className="cover-shadow" /><img src="/book-cover.png" alt="Capa do e-book O Peso da Vontade" /><div className="cover-tag">E-BOOK DIGITAL</div></div><div className="vertical-note">DISCIPLINA <i>•</i> ESTRATÉGIA <i>•</i> AUTODOMÍNIO</div></Reveal>
        <div className="scroll-cue"><span>DESÇA PARA COMEÇAR</span><span className="scroll-line" /></div>
      </section>

      <section className="problem section" id="problema"><div className="section-grid"><Reveal><SectionHeading eyebrow="TALVEZ VOCÊ RECONHEÇA" title="A distância entre quem você <em>poderia ser</em> e quem tem sido." /><p className="body-copy">Você sabe o que precisa fazer. Já fez planos. Já sentiu aquela explosão de vontade no início. Mas, quando a novidade passa, os velhos padrões assumem o volante.</p><p className="body-copy">Enquanto isso, pessoas com menos talento, menos recursos e menos respostas parecem avançar. Não porque encontraram um segredo — mas porque aprenderam a não negociar com a própria decisão.</p></Reveal><Reveal className="problem-list" delay={120}>{['Você adia o que sabe que mudaria tudo.', 'Começa projetos com intensidade e abandona no primeiro atrito.', 'Sente que sua ambição é maior do que a sua execução.', 'Promete que amanhã será diferente — e repete o mesmo dia.'].map((item, i) => <div className="problem-item" key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</Reveal></div></section>

      <section className="manifesto"><Reveal><p>“A vida não muda quando você se sente pronto.<br /><strong>Muda quando você decide não voltar atrás.</strong>”</p></Reveal></section>

      <section className="section transformation" id="transformacao"><Reveal><SectionHeading eyebrow="A VIRADA" title="Vontade não é um sentimento.<br /><em>É uma arquitetura.</em>" text="O Peso da Vontade é um caminho para sair do piloto automático e recuperar o direito de escolher seus próximos movimentos." align="center" /></Reveal><div className="pillars"><Reveal delay={80}><div className="pillar"><span>01</span><Zap /><h3>Clareza</h3><p>Nomeie o que importa antes que o ruído decida por você.</p></div></Reveal><Reveal delay={160}><div className="pillar featured"><span>02</span><Sparkles /><h3>Domínio</h3><p>Treine a capacidade de agir mesmo quando não é confortável.</p></div></Reveal><Reveal delay={240}><div className="pillar"><span>03</span><Target /><h3>Direção</h3><p>Construa uma vida coerente com a pessoa que você quer ser.</p></div></Reveal></div></section>

      <section className="section benefits" id="beneficios"><Reveal><SectionHeading eyebrow="O QUE MUDA NA PRÁTICA" title="Menos promessa.<br /><em>Mais prova.</em>" text="Uma leitura para quem deseja parar de admirar a própria potência à distância e começar a demonstrá-la em atos." /></Reveal><div className="benefit-grid">{benefits.map(({ icon: Icon, title, text }, i) => <Reveal key={title} delay={i * 90} className={i % 2 ? 'from-right' : ''}><article className="benefit-card"><div className="card-icon"><Icon size={21} /></div><span className="card-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p><a href="#conteudo">Entender este princípio <ArrowRight size={15} /></a></article></Reveal>)}</div><div className="center-cta"><Cta>QUERO COMEÇAR MINHA TRANSFORMAÇÃO</Cta></div></section>

      <section className="section content-section" id="conteudo"><div className="content-intro"><Reveal><SectionHeading eyebrow="DENTRO DO LIVRO" title="22 capítulos para<br /><em>reconstruir seu centro.</em>" text="Não são frases bonitas para salvar sua segunda-feira. São provocações e princípios para você pensar melhor, escolher melhor e sustentar o que escolheu." /></Reveal><Reveal delay={120} className="content-stat"><span className="big-stat">22</span><span>capítulos<br />de prática e reflexão</span></Reveal></div><div className="chapter-grid">{chapters.map(([number, title, text], i) => <Reveal key={number} delay={(i % 4) * 45}><article className="chapter"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={16} /></article></Reveal>)}</div><div className="center-cta"><Cta light>QUERO ACESSAR O CONTEÚDO</Cta></div></section>

      <section className="section audience"><div className="audience-grid"><Reveal><span className="eyebrow">ESTE LIVRO É PARA VOCÊ SE...</span><ul className="check-list">{['Você quer construir consistência, não apenas colecionar começos.', 'Você está cansado de negociar com hábitos que diminuem sua vida.', 'Você tem ambição, mas precisa de uma direção mais firme.', 'Você entende que autodomínio é a forma mais alta de liberdade.'].map(x => <li key={x}><Check size={16} />{x}</li>)}</ul></Reveal><Reveal delay={130}><div className="not-for"><span className="eyebrow">NÃO É PARA QUEM...</span><p>Procura uma dose de motivação para se sentir bem por cinco minutos e continuar exatamente igual.</p><div className="line" /><p>Este livro não promete facilidade. Promete algo mais raro: <strong>clareza para fazer o trabalho.</strong></p></div></Reveal></div></section>

      <section className="section testimonials"><Reveal><SectionHeading eyebrow="QUEM ESTÁ LENDO" title="A mudança começa quando você<br /><em>se reconhece na página.</em>" align="center" /></Reveal><div className="testimonial-grid">{testimonials.map((item, i) => <Reveal key={item.name} delay={i * 100}><article className="testimonial"><Quote size={23} /><div className="stars">★★★★★</div><p>“{item.text}”</p><div className="person"><div className="avatar">{item.initials}</div><div><strong>{item.name}</strong><span>{item.role}</span></div></div></article></Reveal>)}</div></section>

      <section className="objection-section"><Reveal><SectionHeading eyebrow="AINDA COM DÚVIDA?" title="Você não precisa se sentir pronto.<br /><em>Só precisa começar.</em>" align="center" /></Reveal><div className="faq-list">{faqs.map(([question, answer], i) => <Reveal key={question} delay={i * 50}><button className={`faq ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{question}</span><ChevronDown size={18} />{openFaq === i && <p>{answer}</p>}</button></Reveal>)}</div></section>

      <section className="final-cta" id="comprar"><div className="final-orbit" /><Reveal className="final-cover"><img src="/book-cover.png" alt="" /></Reveal><Reveal className="final-copy" delay={140}><span className="eyebrow">A SUA PRÓXIMA DECISÃO</span><h2>O peso que você carrega pode ser o mesmo que <em>te coloca de pé.</em></h2><p>Abra o livro. Feche as desculpas. Comece a construir uma vida que obedece às suas decisões.</p><Cta>QUERO O E-BOOK</Cta><div className="secure"><ShieldCheck size={15} /> Pagamento processado com segurança pela Hotmart</div></Reveal></section>
    </main>
    <footer><span>© {new Date().getFullYear()} O Peso da Vontade</span><span>Um livro sobre o comando de si.</span></footer>
    {scrolled && <div className="mobile-sticky"><Cta>ACESSAR AGORA</Cta></div>}
  </div>
}

export default App

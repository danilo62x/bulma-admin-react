import { useState } from 'react'

const FAQ = [
  {
    q: 'O que está incluído no template?',
    a: 'Você recebe o código-fonte completo em React 19 + Bulma + TypeScript, com dezenas de páginas e componentes prontos, dark mode, internacionalização, autenticação mockada e configuração de build otimizada.',
  },
  {
    q: 'Preciso saber TypeScript para usar?',
    a: 'Recomendamos conhecimento básico de React e TypeScript. O código é bem organizado e tipado, o que facilita a manutenção e reduz erros ao longo do desenvolvimento.',
  },
  {
    q: 'O template é responsivo e tem dark mode?',
    a: 'Sim. Todas as telas são mobile-first e totalmente responsivas, com suporte nativo a tema claro e escuro usando tokens de design consistentes.',
  },
  {
    q: 'Recebo atualizações futuras?',
    a: 'Sim. Todas as licenças incluem atualizações gratuitas com novos componentes, correções e melhorias de performance enquanto o produto estiver ativo.',
  },
  {
    q: 'Posso usar em projetos comerciais?',
    a: 'Com certeza. A licença permite uso em projetos comerciais e produtos para clientes. Consulte os termos completos para limites de revenda.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Oferecemos suporte por email para todos os planos e suporte prioritário para os planos Pro e Enterprise, com tempos de resposta reduzidos.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section tx-lp-section">
      <div className="container tx-lp-faq-container">
        <div className="tx-lp-head">
          <span className="tx-lp-eyebrow">FAQ</span>
          <h2 className="title tx-lp-head-title">Perguntas frequentes</h2>
          <p className="subtitle tx-lp-head-sub">Tudo o que você precisa saber antes de começar.</p>
        </div>

        <div className="tx-lp-faq-list">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="tx-lp-faq-item">
                <div className="tx-lp-faq-trigger" role="button" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="tx-lp-faq-q">{item.q}</span>
                  <span className={`mdi tx-lp-faq-chevron ${isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'}`} />
                </div>
                {isOpen && <div className="tx-lp-faq-body">{item.a}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

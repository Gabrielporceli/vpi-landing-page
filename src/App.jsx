import { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';
import { FlickeringGridDemo } from './components/ui/demo.jsx';

const INDICADOR = 'template';
const WEBHOOK_URL = 'https://webhook.gabrielporceli.com.br/webhook/iNDICACAO';

const App = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', segment: '', need: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const SEGMENTS = [
    'E-commerce / Loja online',
    'Prestação de serviços',
    'Infoprodutos / Digital',
    'Varejo físico',
    'Outro',
  ];

  const STATS = [
    { prefix: '',  value: 94,  suffix: '%',  label: 'clientes satisfeitos' },
    { prefix: '',  value: 3,   suffix: 'x',  label: 'crescimento médio' },
    { prefix: '+', value: 200, suffix: '',   label: 'projetos entregues' },
    { prefix: '',  value: 4.9, suffix: '★',  label: 'avaliação média' },
  ];
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const proofRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const el = proofRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || animated.current) return;
      animated.current = true;
      STATS.forEach((stat, i) => {
        const duration = 1200;
        const steps = 60;
        const interval = duration / steps;
        const isDecimal = !Number.isInteger(stat.value);
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = isDecimal
            ? parseFloat((eased * stat.value).toFixed(1))
            : Math.round(eased * stat.value);
          setCounts(prev => { const next = [...prev]; next[i] = current; return next; });
          if (step >= steps) clearInterval(timer);
        }, interval);
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSendError(false);

    const payload = {
      indicador: INDICADOR,
      nome: form.name,
      whatsapp: form.phone,
      segmento: form.segment,
      necessidade: form.need,
      data: new Date().toISOString(),
    };

    // Salva localmente como backup antes de enviar
    try {
      const backlog = JSON.parse(localStorage.getItem('vpi_backlog') || '[]');
      backlog.push(payload);
      localStorage.setItem('vpi_backlog', JSON.stringify(backlog));
    } catch (_) {}

    // Tenta enviar com até 3 tentativas
    let success = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) { success = true; break; }
      } catch (_) {}
      if (attempt < 2) await new Promise(r => setTimeout(r, 1500));
    }

    setLoading(false);
    if (success) {
      setSubmitted(true);
    } else {
      setSendError(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <nav className="nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={logo} alt="Logo" className="nav-logo" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: 0, backgroundColor: 'transparent' }} />
        <button 
          className="btn-primary" 
          style={{ width: 'auto', padding: '10px 24px', fontSize: '13px', margin: 0, color: '#7758DB' }}
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          Entre em Contato
        </button>
      </nav>

      {/* HERO WITH FLICKERING GRID LOGO MASK */}
      <section style={{ position: 'relative', minHeight: '95vh', width: '100%', marginTop: '-76px', paddingTop: '76px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <FlickeringGridDemo />

        {/* Hero Content Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '76px' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="hero-tag" style={{ justifyContent: 'center', marginBottom: '32px' }}>
              <div style={{ width: '28px', height: '0.5px', backgroundColor: '#7758DB' }} />
              <span style={{ fontSize: '11px', color: '#6A6A60', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Você foi indicado por alguém de confiança
              </span>
            </div>

            <h1 className="hero-h1" style={{ maxWidth: '1000px', margin: '0 auto 32px' }}>
              Você chegou até aqui<br />
              porque <span style={{ fontStyle: 'italic', color: '#7758DB' }}>alguém acredita</span><br />
              no seu potencial.
            </h1>

            <p className="hero-sub" style={{ margin: '0 auto', maxWidth: '650px' }}>
              <span style={{ color: '#6A6A60' }}>Essa não é uma oferta aberta. </span>
              <span style={{ color: '#161616', fontWeight: 500 }}>É um convite exclusivo</span>
              {' '}
              <span style={{ color: '#6A6A60' }}>feito por um cliente nosso que viu resultado e quis estender esse benefício para você.</span>
            </p>
          </div>
        </div>
      </section>

      {/* PROOF BAR */}
      <section ref={proofRef} style={{
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
        borderBottom: '0.5px solid rgba(0,0,0,0.06)',
        marginBottom: '80px'
      }}>
        <div className="container proof-bar" style={{ padding: '0' }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="proof-item reveal"
              data-delay={String(i + 1)}
              style={{
                flex: 1,
                padding: '32px 48px',
                borderRight: i < 3 ? '0.5px solid rgba(0,0,0,0.06)' : 'none',
                textAlign: 'center',
              }}
            >
              <div className="proof-number">
                {stat.prefix}{counts[i]}{stat.suffix}
              </div>
              <div className="proof-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <main className="container" style={{ marginBottom: '120px' }}>
        <div
          className="main-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '80px' }}
        >

          {/* LEFT COLUMN */}
          <div className="left-col">
            <span className="section-label reveal reveal--left">Como funciona</span>
            <h2 className="reveal" data-delay="1" style={{ fontSize: '28px', marginBottom: '24px' }}>
              Do convite ao resultado em 3 passos simples.
            </h2>

            <p className="reveal" data-delay="2" style={{ fontSize: '16px', color: '#6A6A60', marginBottom: '48px', maxWidth: '540px' }}>
              O convite de indicação garante que cada pessoa que entra aqui receba uma análise diagnóstica de{' '}
              <span style={{ color: '#161616', fontWeight: 500 }}>o que podemos automatizar</span>.
              {' '}Sem fila. Sem formulário frio. Você foi apresentado por alguém que já conhece o trabalho.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '80px' }}>
              {[
                {
                  n: '01',
                  t: 'Preencha o formulário ao lado',
                  d: 'Nos conte sobre você e o que precisa. Leva menos de 2 minutos. Quanto mais específico, melhor a conversa inicial.',
                },
                {
                  n: '02',
                  t: 'Receba o contato em até 24h',
                  d: 'Por ser indicação, você tem prioridade. Entraremos em contato direto para entender seu contexto e propor solução personalizada.',
                },
                {
                  n: '03',
                  t: 'Condição exclusiva de indicado',
                  d: 'Indicações têm acesso a condições especiais que não são disponibilizadas publicamente. Você merece esse tratamento.',
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="step-item reveal"
                  data-delay={String(i + 1)}
                  style={{ borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.08)' : 'none' }}
                >
                  <div className="step-badge">{step.n}</div>
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{step.t}</h3>
                    <p style={{ fontSize: '15px', color: '#6A6A60' }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* TESTIMONIAL */}
            <div className="testimonial-card reveal reveal--scale" data-delay="2">
              <p style={{ fontStyle: 'italic', fontSize: '16px', marginBottom: '24px', color: '#161616' }}>
                "Vim por indicação de um amigo, cheguei sem muitas expectativas. O atendimento foi um grande diferencial esses meninos são outro nível. Parecia que já conheciam a minha empresa antes da primeira conversa."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(119, 88, 219, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7758DB',
                  fontSize: '14px',
                  fontWeight: 500,
                }}>MR</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>Marcos Ribeiro</div>
                  <div style={{ fontSize: '12px', color: '#6A6A60' }}>Empresário, cliente desde 2023</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — FORM */}
          <div id="contact-form" className="sticky-col reveal reveal--scale" data-delay="3" style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
            <div className="form-card" style={{ background: '#161616', borderRadius: '16px', padding: '40px 36px', color: '#F4F4F4' }}>

              {submitted ? (
                <div className="fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div className="check-pop" style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(119, 88, 219, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: '#7758DB',
                    fontSize: '24px',
                  }}>✓</div>
                  <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Recebido!</h3>
                  <p style={{ fontSize: '15px', color: '#6A6A60', lineHeight: 1.6 }}>
                    Entraremos em contato em até 24h pelo WhatsApp informado. Você tem prioridade por ser indicado.
                  </p>
                </div>
              ) : (
                <>
                  <span className="section-label" style={{ color: '#7758DB' }}>Formulário de Indicação</span>
                  <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 500 }}>
                    Vamos conversar sobre o seu projeto
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6A6A60', marginBottom: '32px' }}>
                    Preencha abaixo e entraremos em contato em até 2 horas.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Seu nome completo</label>
                      <input type="text" name="name" placeholder="Como prefere ser chamado?" required value={form.name} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label>WhatsApp / Telefone</label>
                      <input type="tel" name="phone" placeholder="(00) 00000-0000" required value={form.phone} onChange={handleChange} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                      <span style={{ fontSize: '10px', color: '#8A8880', textTransform: 'uppercase', letterSpacing: '0.1em' }}>sobre você</span>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>

                    <div className="form-group" ref={dropdownRef} style={{ position: 'relative' }}>
                      <label>Qual é o seu negócio?</label>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(o => !o)}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          background: '#1E1E1E',
                          border: `1px solid ${dropdownOpen ? '#7758DB' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '8px',
                          color: form.segment ? '#F4F4F4' : '#6A6A60',
                          fontSize: '14px',
                          fontFamily: 'inherit',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          boxShadow: dropdownOpen ? '0 0 0 3px rgba(119,88,219,0.15)' : 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                      >
                        <span>{form.segment || 'Selecione uma opção'}</span>
                        <svg
                          width="16" height="16" viewBox="0 0 16 16" fill="none"
                          style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', flexShrink: 0 }}
                        >
                          <path d="M4 6l4 4 4-4" stroke="#6A6A60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                      {dropdownOpen && (
                        <ul style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          left: 0,
                          right: 0,
                          background: '#1E1E1E',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          zIndex: 100,
                          listStyle: 'none',
                          padding: '4px',
                          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                          animation: 'dropdownIn 0.18s cubic-bezier(0.25,0.46,0.45,0.94) both',
                        }}>
                          {SEGMENTS.map((seg) => (
                            <li key={seg}>
                              <button
                                type="button"
                                onClick={() => {
                                  setForm(prev => ({ ...prev, segment: seg }));
                                  setDropdownOpen(false);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '10px 14px',
                                  background: form.segment === seg ? 'rgba(119,88,219,0.15)' : 'transparent',
                                  border: 'none',
                                  borderRadius: '6px',
                                  color: form.segment === seg ? '#7758DB' : '#C0C0B8',
                                  fontSize: '14px',
                                  fontFamily: 'inherit',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  transition: 'background 0.15s, color 0.15s',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                }}
                                onMouseEnter={e => { if (form.segment !== seg) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                onMouseLeave={e => { if (form.segment !== seg) e.currentTarget.style.background = 'transparent'; }}
                              >
                                {form.segment === seg && (
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6l3 3 5-5" stroke="#7758DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                                {form.segment !== seg && <span style={{ width: '12px', display: 'inline-block' }} />}
                                {seg}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="form-group">
                      <label>O que você mais precisa agora?</label>
                      <textarea
                        name="need"
                        rows="4"
                        placeholder="Ex: preciso aumentar minhas vendas, organizar meu marketing..."
                        required
                        value={form.need}
                        onChange={handleChange}
                        style={{ resize: 'none' }}
                      />
                    </div>

                    {sendError && (
                      <div style={{ background: 'rgba(220,60,60,0.1)', border: '1px solid rgba(220,60,60,0.25)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                        <div>
                          <p style={{ fontSize: '13px', color: '#F4A0A0', fontWeight: 500, marginBottom: '2px' }}>Falha no envio</p>
                          <p style={{ fontSize: '12px', color: '#A08080', lineHeight: 1.5 }}>Seus dados foram salvos localmente. Tente novamente ou entre em contato diretamente pelo WhatsApp.</p>
                        </div>
                      </div>
                    )}

                    <button type="submit" className="btn-primary btn-cta" disabled={loading}>
                      {loading ? (
                        <span className="btn-cta__loading">
                          <span className="btn-cta__dot" />
                          <span className="btn-cta__dot" />
                          <span className="btn-cta__dot" />
                        </span>
                      ) : (
                        <span className="btn-cta__label">
                          Quero ser atendido
                          <span className="btn-cta__arrow">→</span>
                        </span>
                      )}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                      <span style={{ fontSize: '12px', color: '#A0A090' }}>
                        🔒 Seus dados são protegidos e não serão compartilhados.
                      </span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)', padding: '32px 48px', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={logo} alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <span style={{ fontSize: '12px', color: '#6A6A60' }}>Acesso exclusivo via indicação</span>
          </div>
          <span style={{ fontSize: '12px', color: '#6A6A60' }}>© 2025 — Todos os direitos reservados</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

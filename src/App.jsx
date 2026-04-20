import React, { useState, useEffect } from 'react';

const App = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', segment: '', need: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Injecting CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

      /* Fallback for PP Neue Montreal - using Inter as base */
      @font-face {
        font-family: 'PP Neue Montreal';
        src: local('Inter');
        font-weight: 400;
      }

      :root {
        --bg-main: #F4F4F4;
        --text-main: #161616;
        --accent: #7758DB;
        --accent-light: rgba(119, 88, 219, 0.08);
        --text-secondary: #6A6A60;
        --text-tertiary: #4A4A40;
        --border-sutil: rgba(0,0,0,0.08);
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background-color: var(--bg-main);
        color: var(--text-main);
        font-family: 'PP Neue Montreal', 'Inter', sans-serif;
        font-weight: 400;
        line-height: 1.7;
        -webkit-font-smoothing: antialiased;
      }

      h1, h2, h3 {
        font-weight: 400;
        letter-spacing: -0.03em;
      }

      .container {
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 48px;
      }

      .badge-pill {
        background: var(--accent-light);
        border: 0.5px solid rgba(200,185,122,0.3);
        color: var(--accent);
        padding: 6px 16px;
        border-radius: 100px;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
      }

      .section-label {
        font-size: 11px;
        font-weight: 500;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        display: block;
        margin-bottom: 12px;
      }

      input, select, textarea {
        width: 100%;
        padding: 14px 16px;
        border: 1px solid #D0D0D0;
        border-radius: 8px;
        background: #FFFFFF;
        font-family: inherit;
        font-size: 14px;
        color: #161616;
        transition: border-color 0.2s ease;
        outline: none;
      }

      input:focus, select:focus, textarea:focus {
        border-color: var(--accent);
      }

      label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: #6A6A60;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 8px;
      }

      .form-group {
        margin-bottom: 24px;
      }

      .btn-primary {
        background: #F4F4F4;
        color: #161616;
        width: 100%;
        padding: 16px;
        border: none;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.2s ease, transform 0.2s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
      }

      .btn-primary:hover:not(:disabled) {
        opacity: 0.85;
        transform: translateY(-1px);
      }

      .btn-primary:disabled {
        background: #3A3835;
        cursor: not-allowed;
      }

      /* Transitions */
      .fade-in { animation: fadeIn 0.5s ease-out forwards; }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 860px) {
        .container {
          padding: 0 24px;
        }
        .main-grid {
          grid-template-columns: 1fr !export;
          display: flex;
          flex-direction: column;
        }
        .left-col {
          border-right: none !important;
          border-bottom: 0.5px solid rgba(255,255,255,0.08);
          padding-bottom: 64px;
          margin-bottom: 64px;
        }
        .hero h1 {
          font-size: 38px !important;
        }
        .sticky-col {
          position: static !important;
        }
        .proof-bar {
          flex-wrap: wrap;
        }
        .proof-item {
          width: 50%;
          border: none !important;
          padding: 20px !important;
        }
        .proof-item:nth-child(1), .proof-item:nth-child(2) {
          border-bottom: 0.5px solid rgba(255,255,255,0.06) !important;
        }
        .proof-item:nth-child(1), .proof-item:nth-child(3) {
          border-right: 0.5px solid rgba(255,255,255,0.06) !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrar com webhook/API de envio
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* NAV */}
      <nav style={{ 
        padding: '28px 48px', 
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* SUBSTITUIR PELO LOGO */}
          <div style={{ 
            width: '36px', 
            height: '36px', 
            backgroundColor: '#7758DB', 
            borderRadius: '8px' 
          }} />
        </div>
        <div className="badge-pill">Acesso por Indicação</div>
      </nav>

      {/* HERO */}
      <header className="container" style={{ padding: '80px 48px 64px' }}>
        <div style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '0.5px', backgroundColor: '#7758DB' }} />
            <span style={{ fontSize: '11px', color: '#6A6A60', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Você foi indicado por alguém de confiança
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(42px, 7vw, 80px)', 
            lineHeight: 1.05,
            marginBottom: '32px'
          }}>
            Você chegou até aqui<br />
            porque <span style={{ fontStyle: 'italic', color: '#7758DB' }}>alguém acredita</span><br />
            no seu potencial.
          </h1>

          <p style={{ fontSize: '18px', maxWidth: '600px', WebkitFontSmoothing: 'antialiased' }}>
            <span style={{ color: '#6A6A60' }}>Essa não é uma oferta aberta. </span>
            <span style={{ color: '#161616', fontWeight: 500 }}>É um convite exclusivo</span> — 
            <span style={{ color: '#6A6A60' }}> feito por um cliente nosso que viu resultado e quis estender esse benefício para você.</span>
          </p>
        </div>
      </header>

      {/* PROOF BAR */}
      <section style={{ 
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
        borderBottom: '0.5px solid rgba(0,0,0,0.06)',
        marginBottom: '80px'
      }}>
        <div className="container proof-bar" style={{ display: 'flex', padding: '0' }}>
          {[
            { n: '94%', l: 'clientes satisfeitos' },
            { n: '3x', l: 'crescimento médio' },
            { n: '+200', l: 'projetos entregues' },
            { n: '4.9★', l: 'avaliação média' }
          ].map((item, i) => (
            <div key={i} className="proof-item" style={{ 
              flex: 1, 
              padding: '28px 48px',
              borderRight: i < 3 ? '0.5px solid rgba(0,0,0,0.06)' : 'none',
              textAlign: i === 0 ? 'left' : (i === 3 ? 'right' : 'center')
            }}>
              <div style={{ fontSize: '28px', fontWeight: 500, color: '#7758DB', marginBottom: '4px' }}>{item.n}</div>
              <div style={{ fontSize: '12px', color: '#6A6A60', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <main className="container" style={{ marginBottom: '120px' }}>
        <div className="main-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 420px', 
          gap: '80px' 
        }}>
          
          {/* LEFT COLUMN */}
          <div className="left-col">
            <span className="section-label">Como funciona</span>
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Do convite ao resultado — em 3 passos simples.</h2>
            
            <p style={{ fontSize: '16px', color: '#6A6A60', marginBottom: '48px', maxWidth: '540px' }}>
              O método VPI garante que cada pessoa que entra aqui já chega com contexto, intenção e <span style={{ color: '#161616', fontWeight: 500 }}>prioridade no atendimento</span>. Sem fila. Sem formulário frio. Você foi apresentado por alguém que já conhece o trabalho.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '80px' }}>
              {[
                { 
                  n: '01', 
                  t: 'Preencha o formulário ao lado', 
                  d: 'Nos conte sobre você e o que precisa. Leva menos de 2 minutos. Quanto mais específico, melhor a conversa inicial.' 
                },
                { 
                  n: '02', 
                  t: 'Receba o contato em até 24h', 
                  d: 'Por ser indicação, você tem prioridade. Entraremos em contato direto para entender seu contexto e propor solução personalizada.' 
                },
                { 
                  n: '03', 
                  t: 'Condição exclusiva de indicado', 
                  d: 'Indicações têm acesso a condições especiais que não são disponibilizadas publicamente. Você merece esse tratamento.' 
                }
              ].map((step, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  paddingBottom: '40px',
                  borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.08)' : 'none'
                }}>
                  <div style={{ 
                    minWidth: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    border: '0.5px solid rgba(119, 88, 219, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#7758DB'
                  }}>{step.n}</div>
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{step.t}</h3>
                    <p style={{ fontSize: '15px', color: '#6A6A60' }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* TESTIMONIAL CARD */}
            <div style={{ 
              background: '#FFFFFF',
              border: '0.5px solid rgba(0,0,0,0.08)',
              borderRadius: '12px',
              padding: '28px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}>
              <p style={{ fontStyle: 'italic', fontSize: '16px', marginBottom: '24px', color: '#161616' }}>
                "Fui indicado por um amigo e já cheguei com outra expectativa. O atendimento foi totalmente diferente — parecia que já me conheciam antes da primeira conversa."
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
                  fontWeight: 500
                }}>MR</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>Marcos Ribeiro</div>
                  <div style={{ fontSize: '12px', color: '#6A6A60' }}>Empresário, cliente desde 2023</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div className="sticky-col" style={{ position: 'sticky', top: '40px', alignSelf: 'start' }}>
            <div style={{ 
              background: '#161616', 
              borderRadius: '16px', 
              padding: '40px 36px', 
              color: '#F4F4F4' 
            }}>
              {submitted ? (
                <div className="fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    background: 'rgba(119, 88, 219, 0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: '#7758DB',
                    fontSize: '24px'
                  }}>✓</div>
                  <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Recebido!</h3>
                  <p style={{ fontSize: '15px', color: '#6A6A60', lineHeight: 1.6 }}>
                    Entraremos em contato em até 24h pelo WhatsApp informado. Você tem prioridade por ser indicado.
                  </p>
                </div>
              ) : (
                <>
                  <span className="section-label" style={{ color: '#7758DB' }}>Formulário de Indicação</span>
                  <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 500 }}>Vamos conversar sobre o seu projeto</h3>
                  <p style={{ fontSize: '14px', color: '#6A6A60', marginBottom: '32px' }}>
                    Preencha abaixo e entraremos em contato em até 24 horas.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Seu nome completo</label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Como prefere ser chamado?" 
                        required 
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>WhatsApp / Telefone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="(00) 00000-0000" 
                        required 
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>E-mail</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="seu@email.com" 
                        required 
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                      <span style={{ fontSize: '10px', color: '#8A8880', textTransform: 'uppercase', letterSpacing: '0.1em' }}>sobre você</span>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>

                    <div className="form-group">
                      <label>Qual é o seu negócio?</label>
                      <select 
                        name="segment"
                        required 
                        value={form.segment}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="E-commerce">E-commerce / Loja online</option>
                        <option value="Serviços">Prestação de serviços</option>
                        <option value="Digital">Infoprodutos / Digital</option>
                        <option value="Varejo">Varejo físico</option>
                        <option value="Outro">Outro</option>
                      </select>
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
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? 'Enviando...' : 'Quero ser atendido →'}
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
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
      <footer style={{ 
        borderTop: '0.5px solid rgba(0,0,0,0.06)', 
        padding: '32px 48px',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* SUBSTITUIR PELO LOGO */}
            <div style={{ 
              width: '28px', 
              height: '28px', 
              backgroundColor: '#7758DB', 
              borderRadius: '6px' 
            }} />
            <span style={{ fontSize: '12px', color: '#6A6A60' }}>Acesso exclusivo via indicação</span>
          </div>
          <span style={{ fontSize: '12px', color: '#6A6A60' }}>© 2025 — Todos os direitos reservados</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

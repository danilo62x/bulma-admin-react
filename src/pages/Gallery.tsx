import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'

type MediaType = 'image' | 'video'
type Tab = 'all' | 'image' | 'video'

interface Media {
  id: string
  title: string
  type: MediaType
  meta: string
  /** Imagem (ou poster do vídeo) — Lorem Picsum, livre de direitos autorais */
  thumb: string
  /** URL do vídeo (Blender open movies / amostras públicas — Creative Commons) */
  video?: string
  gradient: string
  span: boolean
}

// Mídia 100% livre de direitos autorais:
//  • Imagens: Lorem Picsum (picsum.photos) — domínio público, sem atribuição.
//  • Vídeos: open movies da Blender Foundation (CC-BY) via bucket público de amostras.
const pic = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`
// Vídeos CC/CC0 com hospedagem pública estável (Big Buck Bunny = Blender CC-BY; flower = MDN CC0)
const VID_BBB720 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4'
const VID_BBB360 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'
const VID_FLOWER = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const VID_BBB_W3 = 'https://www.w3schools.com/html/mov_bbb.mp4'

const MEDIA: Media[] = [
  { id: '1', title: 'Pôr do sol na praia', type: 'image', meta: '1920 × 1080', thumb: pic('praia', 800, 1100), gradient: 'linear-gradient(135deg,#f97316,#ec4899)', span: true },
  { id: '2', title: 'Montanhas ao amanhecer', type: 'image', meta: '2400 × 1600', thumb: pic('montanha'), gradient: 'linear-gradient(135deg,#465fff,#0ba5ec)', span: false },
  { id: '3', title: 'Tour pelo escritório', type: 'video', meta: '00:10 · MP4', thumb: pic('escritorio'), video: VID_BBB720, gradient: 'linear-gradient(135deg,#12b76a,#0ba5ec)', span: false },
  { id: '4', title: 'Arquitetura moderna', type: 'image', meta: '1600 × 2000', thumb: pic('arquitetura', 800, 1100), gradient: 'linear-gradient(135deg,#6366f1,#a855f7)', span: true },
  { id: '5', title: 'Lançamento do produto', type: 'video', meta: '00:06 · MP4', thumb: pic('produto'), video: VID_FLOWER, gradient: 'linear-gradient(135deg,#f04438,#f79009)', span: false },
  { id: '6', title: 'Floresta tropical', type: 'image', meta: '2048 × 1365', thumb: pic('floresta'), gradient: 'linear-gradient(135deg,#059669,#65a30d)', span: false },
  { id: '7', title: 'Cidade à noite', type: 'image', meta: '1920 × 1280', thumb: pic('cidade'), gradient: 'linear-gradient(135deg,#1e293b,#465fff)', span: false },
  { id: '8', title: 'Depoimento de cliente', type: 'video', meta: '00:10 · MP4', thumb: pic('depoimento', 800, 1100), video: VID_BBB_W3, gradient: 'linear-gradient(135deg,#db2777,#7c3aed)', span: true },
  { id: '9', title: 'Detalhe de textura', type: 'image', meta: '1500 × 1500', thumb: pic('textura'), gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)', span: false },
  { id: '10', title: 'Equipe em reunião', type: 'image', meta: '2200 × 1400', thumb: pic('equipe'), gradient: 'linear-gradient(135deg,#0ba5ec,#22d3ee)', span: false },
  { id: '11', title: 'Bastidores do evento', type: 'video', meta: '00:10 · MP4', thumb: pic('evento'), video: VID_BBB360, gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)', span: false },
  { id: '12', title: 'Paisagem minimalista', type: 'image', meta: '1920 × 1080', thumb: pic('paisagem', 800, 1100), gradient: 'linear-gradient(135deg,#10b981,#3b82f6)', span: true },
]

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'image', label: 'Imagens' },
  { id: 'video', label: 'Vídeos' },
]

export default function Gallery() {
  const [tab, setTab] = useState<Tab>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(() => MEDIA.filter((m) => tab === 'all' || m.type === tab), [tab])
  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null

  function changeTab(id: Tab) {
    setTab(id)
    setLightboxIndex(null)
  }
  function close() {
    setLightboxIndex(null)
  }
  function prev() {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }
  function next() {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }

  return (
    <div>
      <div className="tx-gallery-head">
        <div>
          <h1 className="title is-5" style={{ marginBottom: '0.15rem' }}>
            Galeria
          </h1>
          <p className="is-size-7 has-text-grey">Imagens e vídeos da sua biblioteca de mídia.</p>
        </div>
        <div className="buttons has-addons" style={{ marginBottom: 0 }}>
          {TABS.map((t) => (
            <Button key={t.id} size="is-small" type={tab === t.id ? 'is-primary' : 'is-light'} onClick={() => changeTab(t.id)}>
              {t.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="tx-gallery-grid">
        {filtered.map((m, idx) => (
          <button key={m.id} className={`tx-media-card ${m.span ? 'is-tall' : ''}`} onClick={() => setLightboxIndex(idx)}>
            <div
              className="tx-media-bg"
              style={{
                backgroundImage: `url("${m.thumb}")`,
                backgroundColor: '#1f2937',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {m.type === 'video' && (
              <span className="tx-media-badge">
                <span className="mdi mdi-play" /> Vídeo
              </span>
            )}
            <div className="tx-media-overlay">
              <p className="tx-media-title">{m.title}</p>
              <p className="tx-media-meta">{m.meta}</p>
            </div>
            <span className="tx-media-zoom">
              <span className="mdi mdi-magnify-plus-outline" />
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="box has-text-centered" style={{ padding: '3rem' }}>
          <span className="has-text-grey is-size-7">Nenhuma mídia nesta categoria.</span>
        </div>
      )}

      <Modal open={active !== null} onClose={close}>
        <div className="modal-content" style={{ width: 820, maxWidth: '100%' }}>
          {active && (
            <div className="tx-lightbox">
              <div className="tx-lightbox-stage" style={{ background: '#0c111d' }}>
                {active.type === 'video' ? (
                  <video
                    key={active.id}
                    className="tx-lightbox-media"
                    src={active.video}
                    poster={active.thumb}
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img className="tx-lightbox-media" src={active.thumb} alt={active.title} />
                )}
              </div>
              <div className="tx-lightbox-bar">
                <div>
                  <p className="tx-lightbox-title">{active.title}</p>
                  <p className="tx-lightbox-meta">
                    {active.type === 'video' ? 'Vídeo' : 'Imagem'} · {active.meta}
                  </p>
                </div>
                <span className="tx-lightbox-count">
                  {(lightboxIndex ?? 0) + 1} / {filtered.length}
                </span>
              </div>

              <button
                className="tx-lightbox-nav is-prev"
                aria-label="Anterior"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
              >
                <span className="mdi mdi-chevron-left" />
              </button>
              <button
                className="tx-lightbox-nav is-next"
                aria-label="Próximo"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
              >
                <span className="mdi mdi-chevron-right" />
              </button>
              <button
                className="tx-lightbox-close"
                aria-label="Fechar"
                onClick={(e) => {
                  e.stopPropagation()
                  close()
                }}
              >
                <span className="mdi mdi-close" />
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

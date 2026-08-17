// Purely decorative background blobs + floating shapes.
export default function Decorations() {
  return (
    <div className="decorations" aria-hidden="true">
      <span className="blob blob--1" />
      <span className="blob blob--2" />
      <span className="blob blob--3" />
      <span className="float-shape float-shape--1">✦</span>
      <span className="float-shape float-shape--2">✧</span>
      <span className="float-shape float-shape--3">●</span>
      <span className="float-shape float-shape--4">✦</span>
    </div>
  )
}


import '../styles/ErrorPage.css'; 

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Ojdå!</h1>
      <p>Sidan du letar efter kunde inte hittas.</p>
      <p>Det verkar som att sidan antingen har flyttats eller inte finns längre.</p>
      <button onClick={() => window.history.back()}>Tillbaka</button>
    </div>
  );
}

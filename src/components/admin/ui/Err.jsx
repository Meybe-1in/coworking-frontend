export default function Err({ msg }) {
  return (
    <div
      style={{
        padding: "32px",
        textAlign: "center",
        color: "#ef4444",
        fontSize: 13.5,
      }}
    >
      {msg}
    </div>
  );
}
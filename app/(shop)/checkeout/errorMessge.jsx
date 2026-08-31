export default function ErrorMessage({ message }) {
  return message ? (
    <p className="text-danger small mt-1 JSON_error">{message}</p>
  ) : (
    ""
  );
}

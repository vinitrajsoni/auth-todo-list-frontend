export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '24rem' }}>
        <div className="card-body text-center">
          <h1 className="card-title mb-4">Welcome to the Auth App</h1>
          <p className="card-text mb-3">Please choose an option:</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="/login" className="btn btn-outline-primary">Login</a>
            <a href="/register" className="btn btn-outline-primary">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

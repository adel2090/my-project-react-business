/** <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          value={userInput.email}
          onChange={handleUserInputChange}
        />
        <label htmlFor="email">Email address</label>
      </div> */

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-floating">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};
export default Input;

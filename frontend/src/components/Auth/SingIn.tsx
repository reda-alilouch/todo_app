export default function SignIn() {
  return (
    <div className="flex flex-col gap-3">
      <form action="post">
        <div className="flex flex-col gap-3">
          <input
            className="p-2 text-black border rounded-sm"
            type="text"
            placeholder="E-mail"
          />
          <input
            className="p-2 text-black border rounded-sm"
            type="password"
            placeholder="Password"
          />
        </div>
      </form>
      <button className="px-2 text-black border rounded-sm">Connexion</button>
    </div>
  );
}

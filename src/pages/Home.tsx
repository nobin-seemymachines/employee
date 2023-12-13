
import { Link } from "react-router-dom";
function Home({ buttonText }: { buttonText: boolean }) {
  return (
    <div className="info">
      <h2>information</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        provident numquam, amet maiores natus ratione cupiditate nisi minus
        voluptas expedita consequuntur.
      </p>
      <p>
        Commodi officia autem neque laboriosam! Sequi quisquam magni veritatis
        esse vel inventore sint fugit possimus.
      </p>
      <div className="change-btn">
      <Link to={buttonText ? "/" : "/register"}>
        <button >{buttonText ? "Have An Account" : "Create An Account"}</button>
      </Link>
      </div>
    </div>
  );
}

export default Home;



import { useLocation, useParams } from "react-router-dom";
import AnimatePage from "../../components/animate/AnimatePage";

const SetupStep = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  return (
    <AnimatePage key={pathname}>
      <div style={{ width: 500 }}>
        {id}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ab in eos doloribus officia sunt deserunt
        delectus aliquam repudiandae nam ad illo molestias quod animi nemo cum facere! Nesciunt eaque reiciendis
        repellat minima eligendi nemo quaerat ea et culpa incidunt? Culpa asperiores fugiat neque vero est similique
        natus mollitia itaque quasi. Error ut quasi velit deserunt eum, maxime qui? Dolore doloribus et cupiditate
        dolorem nisi consequuntur nulla. Quas molestiae minus laboriosam magni eum totam iure fugit consequuntur minima
        voluptates dolor distinctio deserunt voluptatum quam deleniti obcaecati sapiente ipsam nesciunt sequi, iste
        necessitatibus reiciendis excepturi suscipit ipsum? Maiores sed minus tempora.
      </div>
    </AnimatePage>
  );
};

export default SetupStep;

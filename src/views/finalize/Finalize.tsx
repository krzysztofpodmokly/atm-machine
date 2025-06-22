import Heading from '../../components/heading/Heading';
import Loader from '../../components/loader/Loader';

const Finalize = () => {
  return (
    <div>
      <Heading as="h3" size="xl">
        Finalizing transaction...
      </Heading>
      <Loader />
    </div>
  );
};

export default Finalize;

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import CreatePet from '../CreatePet';

const EditPet: FC = () => {
  const { id }: { id: string } = useParams();
  return <CreatePet petId={id} />;
};

export default EditPet;

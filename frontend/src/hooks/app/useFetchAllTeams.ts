import { useQuery } from '@apollo/react-hooks';
import { Team } from '../../@types';
import { getAllTeams } from '../../graphql';

export const useFetchAllTeams = (): {
  data: { getAllTeams: Team[] };
  error?: any;
  loading: boolean;
} => {
  const data = useQuery(getAllTeams);
  return data;
};

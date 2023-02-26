import { useRouter } from 'next/router';
import { UserInfo } from '@/api/discord';
import { useGuilds, useSelfUserQuery } from './queries';

export function useSelectedGuild() {
  const router = useRouter();
  const { guild } = router.query as { guild: string };

  return {
    selected: guild,
    setSelected(guild: string) {
      router.push(`/guilds/${guild}`);
    },
  };
}

/**
 * never use this hook if the components isn't rendered inside AppLayout
 */
export function useSelfUser(): UserInfo {
  return useSelfUserQuery().data!!;
}

export function useGuildPreview(guild: string) {
  const query = useGuilds();

  return {
    guild: query.data?.find((g) => g.id === guild),
    query,
  };
}

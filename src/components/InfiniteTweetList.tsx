import { LargeNumberLike } from "crypto";
import InfiniteScroll from "react-infinite-scroll-component";

type Tweet = {
  id: string;
  content: string;
  createAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

export function InfiniteTweetList({
  tweets,
  isError,
  isLoading,
  fetchNewTweets,
  hasMore,
}: InfiniteTweetListProps) {
  if (isLoading) return <h1>Loading up</h1>;
  if (isError) return <h1>Errors :O</h1>;
  if (tweets == null) return null;

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={"Loading..."}
      >
        {tweets.map((tweet) => {
          return <div key={tweet.id}>{tweet.content}</div>;
        })}
      </InfiniteScroll>
    </ul>
  );
}

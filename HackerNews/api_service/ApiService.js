const HN_TOP_STORIES_URL =
  'https://hacker-news.firebaseio.com/v0/topstories.json';
const HN_ITEM_URL =
  'https://hacker-news.firebaseio.com/v0/item';

export async function fetchTop10Stories() {
  try {
    // Step 1: get top story IDs
    const idsResponse = await fetch(HN_TOP_STORIES_URL);
    const ids = await idsResponse.json();

    // Step 2: take top 10 IDs
    const top10Ids = ids.slice(0, 10);

    // Step 3: fetch story details in parallel
    const stories = await Promise.all(
      top10Ids.map(async (id) => {
        const res = await fetch(`${HN_ITEM_URL}/${id}.json`);
        return res.json();
      })
    );

    return stories;
  } catch (error) {
    console.error('Error fetching HN stories:', error);
    throw error;
  }
}

import algoliasearch from 'algoliasearch';
const client = algoliasearch('HSOIS8V3M5', '72244989a3a523ba7aeaca8d4831eece');
export const algolia_index = client.initIndex('processos');

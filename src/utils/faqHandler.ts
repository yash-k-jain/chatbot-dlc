import { faqData } from '../data/faqData';

// Function to check if user's query matches any FAQ
export const getFAQResponse = (query: string): string | null => {
  // Convert query to lowercase for case-insensitive matching
  const normalizedQuery = query.toLowerCase();
  
  // Try to find an exact question match first
  const exactMatch = faqData.find(
    faq => faq.question.toLowerCase() === normalizedQuery
  );
  
  if (exactMatch) {
    return exactMatch.answer;
  }
  
  // If no exact match, look for keyword matches
  // for (const faq of faqData) {
  //   // Check if any keywords are contained in the query
  //   if (faq.keywords.some(keyword => normalizedQuery.includes(keyword.toLowerCase()))) {
  //     return faq.answer;
  //   }
  // }
  
  // No match found
  return null;
};
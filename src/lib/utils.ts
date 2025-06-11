export const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  const codePoints = [...countryCode.toUpperCase()].map(
    (char) => 0x1f1e6 + char.charCodeAt(0) - 65
  );
  return String.fromCodePoint(...codePoints);
};

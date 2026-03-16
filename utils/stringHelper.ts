export const getInitials = (name: string | undefined | null): string => {
  if (!name) return "S";

  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  const firstInitial = parts[0].charAt(0);
  const secondInitial = parts[1].charAt(0);

  return (firstInitial + secondInitial).toUpperCase();
};

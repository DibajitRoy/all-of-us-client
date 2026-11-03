export const EVENT_TYPES = [
  "Cleanup", "Plantation", "Donation", "Food Distribution",
  "Health Camp", "Blood Donation", "Education", "Other",
] as const;

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName?: string;
  participants: number;
  createdAt: string;
}

export interface IJoinedEvent {
  _id: string;
  eventId: string;
  title: string;
  thumbnail: string;
  location: string;
  eventType: string;
  eventDate: string;
  joinedAt: string;
}
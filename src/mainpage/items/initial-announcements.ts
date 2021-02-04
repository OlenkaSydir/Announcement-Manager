import { Announcement } from "../../shared/types";
import uuid from 'react-uuid'

export const initialAnnouncements: Array<Announcement> = [
  {
    id: uuid(),
    title: "Important announcement",
    description: "His announcement provides a significant step towards the Afghan people assuming security responsibility for their country.",
    dateOfUpdate: new Date().toDateString(),
  },
  {
    id: uuid(),
    title: "President's announcement",
    description: "In that connection, it welcomed the announcement by President Bozizé of the establishment of a preparatory committee to organize the dialogue.",
    dateOfUpdate: new Date().toDateString(),
  },

];

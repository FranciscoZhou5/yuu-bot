import { Message } from "discord.js";
import { roles } from "../constants/roles";

export default function isAdmin(member: Message<boolean>["member"]) {
  return member?.roles.cache.has(roles.owner) || member?.roles.cache.has(roles.adm);
}

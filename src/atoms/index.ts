import { atom } from "jotai";
import { RuleWithStatus } from "@/types";
import atomWithDebounce from "./atomWithDebounce";

export const activeRulesAtom = atom<RuleWithStatus[]>([]);
export const {
	currentValueAtom: passwordAtom,
	debouncedValueAtom: debouncedPasswordAtom,
} = atomWithDebounce<string>("");

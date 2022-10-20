import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { Character } from "../features/character/Character";
import { useContext } from "react";
import { CharacterContext } from "../context/characterPositionContext";

export default function Home() {
  const { pos } = useContext(CharacterContext);
  return (
    <div className={styles.container}>
      {pos.x} {pos.y}
      <Character />
    </div>
  );
}

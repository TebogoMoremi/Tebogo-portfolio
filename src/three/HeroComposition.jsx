import { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import HeroScene from "./HeroScene";
import Starfield from "./Starfield";

export default function HeroComposition({ heroRef, visualRef, pointerRef, compact, active }) {
  const group = useRef();
  const { size, viewport } = useThree();
  useLayoutEffect(() => {
    const align = () => {
      if (!heroRef.current || !visualRef.current || !group.current) return;
      const hero = heroRef.current.getBoundingClientRect();
      const slot = visualRef.current.getBoundingClientRect();
      group.current.position.set(
        ((slot.left - hero.left + slot.width / 2) / hero.width - 0.5) * viewport.width,
        (0.5 - (slot.top - hero.top + slot.height / 2) / hero.height) * viewport.height,
        0,
      );
      group.current.scale.setScalar(Math.min(slot.height / 8.5, slot.width / 8.3) * viewport.height / size.height);
    };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(heroRef.current);
    observer.observe(visualRef.current);
    return () => observer.disconnect();
  }, [heroRef, visualRef, size, viewport]);
  return <>
    <Starfield compact={compact} active={active} pointerRef={pointerRef} />
    <group ref={group}><HeroScene compact={compact} active={active} kind="hero" /></group>
  </>;
}

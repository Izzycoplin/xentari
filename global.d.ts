// global.d.ts
import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: ReactThreeFiber.Node<THREE.AmbientLight, typeof THREE.AmbientLight>;
      pointLight: ReactThreeFiber.Node<THREE.PointLight, typeof THREE.PointLight>;
      directionalLight: ReactThreeFiber.Node<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      Stage: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
      // …and any other drei/three JSX tags you use
    }
  }
}



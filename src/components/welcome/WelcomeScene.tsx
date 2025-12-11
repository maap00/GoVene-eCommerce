import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Sparkles, Cloud } from '@react-three/drei';
import * as THREE from 'three';

// Amazonian Palm-like Plant
const AmazonPlant = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
    return (
        <group position={position} scale={scale}>
            {/* Trunk - slender and curved */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.1, 0.15, 3, 8]} />
                <meshStandardMaterial color="#5c4033" roughness={0.9} />
            </mesh>

            {/* Leaves - Broad palm leaves */}
            <group position={[0, 3, 0]}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <mesh key={i} rotation={[0.5, i * (Math.PI / 3), 0]} position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.02, 0.1, 1.5, 3]} />
                        <meshStandardMaterial color="#2d5a27" side={THREE.DoubleSide} />
                    </mesh>
                ))}
                {/* Second layer of leaves */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <mesh key={`top-${i}`} rotation={[0.2, i * (Math.PI * 2 / 5), 0]} position={[0, 0.2, 0]}>
                        <cylinderGeometry args={[0.01, 0.08, 1.2, 3]} />
                        <meshStandardMaterial color="#4a8a34" side={THREE.DoubleSide} />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// Fern-like Plant (Ground cover)
const Fern = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
    return (
        <group position={position} scale={scale}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <mesh key={i} rotation={[0.8, i * (Math.PI / 4), 0]} position={[0, 0, 0]}>
                    <planeGeometry args={[0.3, 1]} />
                    <meshStandardMaterial color="#3a7a34" side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    );
};

// Toucan
const Toucan = ({ position, speed = 1, radius = 5 }: { position: [number, number, number], speed?: number, radius?: number }) => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        // Circular flight path with some vertical movement
        groupRef.current.position.x = Math.sin(t) * radius;
        groupRef.current.position.z = Math.cos(t) * radius - 5; // Offset z to center in view
        groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.5;

        // Rotation to face flight direction
        groupRef.current.rotation.y = Math.atan2(Math.cos(t), -Math.sin(t)) + Math.PI;
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Body - Black */}
            <mesh position={[0, 0, 0]} castShadow>
                <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
                <meshStandardMaterial color="#111111" roughness={0.5} />
            </mesh>

            {/* White Neck/Chest area */}
            <mesh position={[0, 0.1, 0.12]} rotation={[-0.2, 0, 0]}>
                <sphereGeometry args={[0.14, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Beak - Large and Colorful */}
            <group position={[0, 0.2, 0.15]} rotation={[0.2, 0, 0]}>
                {/* Upper Beak */}
                <mesh position={[0, 0, 0.25]}>
                    <coneGeometry args={[0.08, 0.6, 8]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#ffaa00" />
                </mesh>
                {/* Beak Tip */}
                <mesh position={[0, 0.02, 0.5]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
            </group>

            {/* Wings */}
            <mesh position={[0.15, 0, 0]} rotation={[0, 0, -0.5]}>
                <boxGeometry args={[0.1, 0.4, 0.2]} />
                <meshStandardMaterial color="#111111" />
            </mesh>
            <mesh position={[-0.15, 0, 0]} rotation={[0, 0, 0.5]}>
                <boxGeometry args={[0.1, 0.4, 0.2]} />
                <meshStandardMaterial color="#111111" />
            </mesh>

            {/* Tail */}
            <mesh position={[0, -0.25, -0.1]} rotation={[-0.5, 0, 0]}>
                <boxGeometry args={[0.15, 0.3, 0.05]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>
        </group>
    );
};

// Animated Firefly
const Firefly = ({ position, speed = 1, color = "#ffff00" }: { position: [number, number, number], speed?: number, color?: string }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        meshRef.current.position.x = initialPos.x + Math.sin(t) * 1.5;
        meshRef.current.position.y = initialPos.y + Math.cos(t * 1.5) * 1;
        meshRef.current.position.z = initialPos.z + Math.sin(t * 0.5) * 1.5;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={color} />
            <pointLight distance={3} intensity={2} color={color} />
        </mesh>
    );
};

export const WelcomeScene = () => {
    // Generate random plants
    const plants = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 25,
                -3,
                (Math.random() - 0.5) * 15 - 8
            ] as [number, number, number],
            scale: 0.8 + Math.random() * 1.2,
            type: Math.random() > 0.3 ? 'palm' : 'fern'
        }));
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-green-950">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 1, 8]} />
                <fog attach="fog" args={['#051a0a', 2, 20]} />

                {/* Lighting */}
                <ambientLight intensity={0.3} color="#002200" />
                <spotLight
                    position={[5, 15, 5]}
                    angle={0.4}
                    penumbra={1}
                    intensity={1.5}
                    castShadow
                    color="#ffd700" // Warm sunlight filtering through
                />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00ffaa" />

                {/* Environment */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={150} scale={15} size={3} speed={0.4} opacity={0.6} color="#aaffaa" />
                <Cloud opacity={0.4} speed={0.1} width={25} depth={2} segments={10} position={[0, 6, -12]} color="#1a3322" />

                {/* Vegetation */}
                {plants.map((plant, i) => (
                    plant.type === 'palm' ?
                        <AmazonPlant key={i} position={plant.position} scale={plant.scale} /> :
                        <Fern key={i} position={plant.position} scale={plant.scale * 0.5} />
                ))}

                {/* Animals */}
                <Toucan position={[0, 3, 0]} speed={0.8} radius={6} />
                <Toucan position={[2, 4, 0]} speed={0.6} radius={8} />

                {/* Fireflies */}
                <Firefly position={[-2, 0, 2]} color="#ffff00" speed={1.2} />
                <Firefly position={[2, 1, 1]} color="#ffaa00" speed={0.8} />
                <Firefly position={[0, 2, -2]} color="#aaff00" speed={1} />

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#0f2610" roughness={0.9} />
                </mesh>
            </Canvas>
        </div>
    );
};

"use client";

import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine, IOptions } from 'tsparticles-engine';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

const ParticlesComponent: React.FC = () => {
  const options: DeepPartial<IOptions> = {
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
          parallax: {
            force: 10,
          },
        },
        onClick: {
          enable: true,
          mode: 'push'
        }
      },

      modes: {
        push: {
          quantity: 4
        },
        repulse: {
          distance: 150,
          duration: 1
        }
      }
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        path: {},

        spin: {},
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.5,
        },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
        },
      },
      size: {
        value: { min: 2, max: 3 },
        animation: {
          speed: 10,
          minimumValue: 10,
        },
      },
      life: {
        count: 0,
        delay: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          sync: false,
        },
        duration: {
          random: {
            enable: false,
            minimumValue: 0.0001,
          },
          value: 0,
          sync: false,
        },
      },
      twinkle: {
        lines: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
        particles: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
      },
      links: {
        blink: false,
        color: {
          value: '#ffffff',
        },
        consent: false,
        distance: 100,
        enable: true,
        frequency: 1,
        opacity: 0.4,
        shadow: {
          blur: 5,
          color: {
            value: '#000',
          },
          enable: false,
        },
        triangles: {
          enable: false,
        },
        width: 1,
        warp: false,
      },
    },
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    loadFull(engine);
  }, []);

  return <Particles init={particlesInit} options={options as IOptions} />;
};

export default ParticlesComponent;

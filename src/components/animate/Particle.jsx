import React from "react";
import Particles from "react-tsparticles";
function Particle() {
  return (
    <div>
      <Particles
        id="tsparticles"
        params={{
          background: {
            color: {
              value: "#efefef",
            },
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          fullScreen: {
            zIndex: 1,
          },
          interactivity: {
            events: {
              onClick: {
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "bubble",
              },
            },
            modes: {
              bubble: {
                distance: 500,
                duration: 2,
                opacity: 0.8,
                color: {
                  value: "#5276f5",
                },
                size: 20,
              },
              grab: {
                distance: 500,
              },
            },
          },
          particles: {
            color: {
              value: "#1b1e34",
            },
            links: {
              color: {
                value: "#ffffff",
              },
              distance: 400,
              width: 2,
            },
            move: {
              attract: {
                rotate: {
                  x: 700,
                  y: 1200,
                },
              },
              enable: true,
              outModes: {
                bottom: "out",
                lft:"out",
                right: "out",
                top: "out",
              },
              speed: 6,
            },
            number: {
              density: {
                enable: true,
              },
              value: 6,
            },
            opacity: {
              random: {
                enable: true,
                minimumValue: 0.3,
              },
              value: {
                min: 0.3,
                max: 0.5,
              },
              animation: {
                speed: 0.8,
                minimumValue: 0.1,
              },
            },
            shape: {
              options: {
                polygon: {
                  sides: 6,
                },
                star: {
                  sides: 6,
                },
              },
              type: "polygon",
            },
            size: {
              random: {
                enable: true,
                minimumValue: 100,
              },
              value: {
                min: 50,
                max: 80,
              },
              animation: {
                minimumValue: 40,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Particle;

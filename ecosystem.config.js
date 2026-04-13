module.exports = {
    apps: [
      {
        name: "new-rmw",
        script: "npm",
        args: "start",
        instances: "max", 
        exec_mode: "cluster",
      },
    ],
  };
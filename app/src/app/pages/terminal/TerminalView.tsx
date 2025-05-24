import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";

const TerminalView = () => {
  const terminalRef: any = useRef(null);

  useEffect(() => {
    const term = new Terminal();
    term.open(terminalRef.current);

    // Example: Write a welcome message
    term.writeln("Welcome to the Web Terminal!");
    term.writeln("Type your commands below:");

    // Handle terminal input
    term.onData((data) => {
      term.write(`You typed: ${data}`);
      // Send the data to the backend for processing
    });

    return () => term.dispose();
  }, []);
  return <div ref={terminalRef} style={{ height: "100%", width: "100%" }} />;
};

export default TerminalView;

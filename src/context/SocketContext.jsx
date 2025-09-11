import { createContext, useContext, useState, useEffect, useRef } from 'react';

// Create the context
const WebSocketContext = createContext(undefined);

// Custom hook to use the context
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

// Provider component
export const WebSocketProvider = ({ children, url, reconnectDelay = 3000, heartbeatInterval = 30000 }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const heartbeatRef = useRef(null);

  // Cleanup function
  const cleanup = () => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // Connect function
  const connect = () => {
    cleanup(); // Ensure clean state

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
      console.log('WebSocket connected to Elysia server');

      // Start heartbeat if enabled
      if (heartbeatInterval > 0) {
        heartbeatRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'heartbeat' }));
          }
        }, heartbeatInterval);
      }
    };

    ws.onmessage = (event) => {
      try {
        console.log(event.data);
      } catch (parseErr) {
        console.error('Failed to parse WebSocket message:', parseErr);
        setError('Invalid message format');
      }
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      if (event.code !== 1000) { // 1000 is normal closure
        setError(`Connection closed: ${event.reason || 'Unknown reason'}`);
        // Reconnect logic
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connect();
        }, reconnectDelay);
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('Connection error');
    };
  };

  // Send message function
  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, message not sent');
      setError('Not connected');
    }
  };

  // Initial connection on mount
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [url]); // Reconnect if URL changes

  // Context value
  const value = {
    isConnected,
    sendMessage,
    lastMessage,
    error,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
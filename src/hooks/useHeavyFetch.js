import { useEffect, useState } from "react";
import axios from "axios";

export default function useHeavyFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    // ❌ multiple parallel calls
    for (let i = 0; i < 5; i++) {
      axios.get(url).then((res) => {
        if (mounted) {
          setData(res.data);
        }
      });
    }

    // ❌ missing cancellation
    // ❌ no cleanup of requests
    return () => {
      mounted = false;
    };
  }, [url]);

  return data;
}
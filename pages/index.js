import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi } from "@/constants/abi"
import { useState, useEffect } from "react"

export default function Home () {
  const [hasMetamask, setHasMetamask] = useState(false)
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  // enableWeb3: the function for connecting metamask
  // isWeb3Enabled: metamask is connected or not

  // runContractFunction: the contract function that is set up below 
  const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName: "store",
    params: {
      _favoriteNumber: 88
    }
  })

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true)
    }
  })

  return (
    <div>
      {hasMetamask ? (isWeb3Enabled ? (
        "Connected!") : (<button onClick={() => enableWeb3()}>Connect</button>)
      ) : ("Please install metamask!")}
      {isWeb3Enabled ? (<button onClick={() => runContractFunction()}>Execute</button>) : ""}
    </div>
  )
}

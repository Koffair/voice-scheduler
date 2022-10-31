const useFlow = () => {
  const wait = (delaySec = 1) => new Promise(resolve => {
    setTimeout(resolve, delaySec * 1000)
  })

  return {
    wait
  }
}

export default useFlow

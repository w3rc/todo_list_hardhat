import { ethers } from 'hardhat'

const main = async () => {
  const TodoList = await ethers.getContractFactory('TodoList')

  const todoList = await TodoList.deploy()
  await todoList.deployed()

  console.log(`TodoList has been deployed. Address -> ${todoList.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('TodoList', () => {
  const deployFixture = async () => {
    const TodoList = await ethers.getContractFactory('TodoList')
    const todoList = await TodoList.deploy()

    return { todoList }
  }

  it('should initialize with initial task', async () => {
    const { todoList } = await loadFixture(deployFixture)
    expect(await todoList.taskCount()).to.equal(1)
    expect((await todoList.tasks(1)).taskName).to.equal('This is a new task')
    expect((await todoList.tasks(1)).completed).to.equal(false)
  })

  it('should create task successfully', async () => {
    const { todoList } = await loadFixture(deployFixture)

    await todoList.createTask('This is another task', 'Some description')
    expect(await todoList.taskCount()).to.eq(2)
    expect((await todoList.tasks(2)).taskName).to.eq('This is another task')
    expect((await todoList.tasks(2)).description).to.eq('Some description')
    expect((await todoList.tasks(2)).completed).to.eq(false)
  })

  it('should emit an event when task is created', async () => {
    const { todoList } = await loadFixture(deployFixture)

    expect(todoList.createTask('Test Events', 'This task tests events'))
      .to.emit(todoList, 'TaskCreated')
      .withArgs(2, 'Test Events', 'This task tests events')
  })

  it('should complete a task if its incomplete', async () => {
    const { todoList } = await loadFixture(deployFixture)

    expect((await todoList.tasks(1)).completed).to.equal(false)

    await todoList.toggleCompleted(1)
    expect((await todoList.tasks(1)).completed).to.equal(true)
  })

  it('should mark a task as incomplete if its complete', async () => {
    const { todoList } = await loadFixture(deployFixture)
    // Mark task as completed
    await todoList.toggleCompleted(1)

    expect((await todoList.tasks(1)).completed).to.equal(true)

    await todoList.toggleCompleted(1)
    expect((await todoList.tasks(1)).completed).to.equal(false)
  })

  it('should emit an event when task is completed', async () => {
    const { todoList } = await loadFixture(deployFixture)

    expect(todoList.toggleCompleted(1))
      .to.emit(todoList, 'TaskCompleted')
      .withArgs(1, true)
  })
})

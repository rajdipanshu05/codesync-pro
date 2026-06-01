import { create } from 'zustand'
import { axiosInstance } from '../api/axios'

export const useProblemStore = create(set => ({
  problems: [],
  isLoading: false,

  getProblems: async () => {
    try {
      set({ isLoading: true })

      const response = await axiosInstance.get('/problems')
      set({
        problems: response.data
      })
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },
  // in problemStore
  getProblemById: async id => {
    set({ isLoading: true })
    const res = await axiosInstance.get(`/problems/${id}`)
    const data = await res.data;
    console.log(data)
    set({ currentProblem: data, isLoading: false })
  }
}))

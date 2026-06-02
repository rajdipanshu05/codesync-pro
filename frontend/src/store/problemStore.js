import { create } from 'zustand'
import { axiosInstance } from '../api/axios'

export const useProblemStore = create(set => ({
  problems: [],
  isLoading: false,
  isRunning:false,
   currentProblem: null,
  currentResult: null,

  getProblems: async () => {
    try {
      set({ isLoading: true })

      const response = await axiosInstance.get('/problems')
      set({
        problems: response.data
      })
    } catch (error) {
    } finally {
      set({ isLoading: false })
    }
  },
  // in problemStore
  getProblemById: async id => {
    set({ isLoading: true })
    const res = await axiosInstance.get(`/problems/${id}`)
    const data = res.data
    set({ currentProblem: data, isLoading: false })
  },

  runCode: async data => {
    set({ isRunning: true })
    const res = await axiosInstance.post(`/problems/run`, data)
    // console.log(res.data);
    const result=res?.data
    set({currentResult:result, isRunning: false })

    return result;
  },
  submitCode: async data => {
    set({ isRunning: true })
    const res = await axiosInstance.post(`/problems/submit`, data)
    // console.log(res.data);
    const result=res?.data
    set({currentResult:result, isRunning: false })
    
    return result;
  }

}))

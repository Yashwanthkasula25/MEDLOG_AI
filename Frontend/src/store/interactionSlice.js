import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  hcp_name: '',
  interaction_type: '',
  date: '',
  time: '',
  attendees: [],
  topics: '',
  materials_shared: [],
  samples_distributed: [],
  sentiment: '',
  outcomes: '',
  follow_up_actions: '',
  status: 'idle'
}

const slice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    setInteraction(state, action) { return { ...state, ...action.payload } },
    updateFields(state, action) { Object.assign(state, action.payload) },
    resetInteraction() { return initialState },
    setStatus(state, action) { state.status = action.payload }
  }
})

export const { setInteraction, updateFields, resetInteraction, setStatus } = slice.actions
export default slice.reducer

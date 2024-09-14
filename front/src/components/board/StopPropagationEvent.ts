export default interface StopPropagationEvent {
    target: EventTarget | null,
    stopPropagation: () => void
}
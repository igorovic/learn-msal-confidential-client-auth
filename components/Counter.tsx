import { useAppSelector, useAppDispatch } from "app/hooks";
import { decrement, increment } from "app/features/counter/counterSlice";

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  function incrementHandler() {
    dispatch(increment());
  }
  function decrementHandler() {
    dispatch(decrement());
  }
  return (
    <div className="grid content-center justify-center align-middle mt-6">
      <div className="text-center p-8">
        <span className="text-2xl">{count}</span>
      </div>
      <div className="flex flex-row gap-4">
        <button className="btn btn-primary" onClick={incrementHandler}>
          +
        </button>
        <button className="btn btn-primary" onClick={decrementHandler}>
          -
        </button>
      </div>
    </div>
  );
}

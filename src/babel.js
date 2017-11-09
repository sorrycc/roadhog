export default function (context, opts = {}) {
  return {
    presets: [[require.resolve('babel-preset-af-react'), opts]],
  };
}

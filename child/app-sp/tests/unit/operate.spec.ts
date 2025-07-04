describe('机器状态和虚拟机列表条件判断', () => {
  const checkCondition = (machineStatus: string, ecsList: any[]) => {
    return ['lock','storage_error','crash','init','init_error'].includes(machineStatus) && ecsList.length === 0;
  };

  test('当机器状态为lock且无虚拟机时应该返回true', () => {
    expect(checkCondition('lock', [])).toBe(true);
  });

  test('当机器状态为storage_error且无虚拟机时应该返回true', () => {
    expect(checkCondition('storage_error', [])).toBe(true);
  });

  test('当机器状态为crash且无虚拟机时应该返回true', () => {
    expect(checkCondition('crash', [])).toBe(true);
  });

  test('当机器状态为init且无虚拟机时应该返回true', () => {
    expect(checkCondition('init', [])).toBe(true);
  });

  test('当机器状态为init_error且无虚拟机时应该返回true', () => {
    expect(checkCondition('init_error', [])).toBe(true);
  });

  test('当机器状态不在允许列表中时应该返回false', () => {
    expect(checkCondition('running', [])).toBe(false);
  });

  test('当有虚拟机时应该返回false', () => {
    expect(checkCondition('lock', [{ id: 1 }])).toBe(false);
  });
}); 